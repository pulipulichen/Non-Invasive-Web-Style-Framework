module.exports = {
  removeComment: function (str) {
    str = ('__' + str + '__').split('');
    var mode = {
        singleQuote: false,
        doubleQuote: false,
        regex: false,
        blockComment: false,
        lineComment: false,
        condComp: false 
    };
    for (var i = 0, l = str.length; i < l; i++) {
 
        if (mode.regex) {
            if (str[i] === '/' && str[i-1] !== '\\') {
                mode.regex = false;
            }
            continue;
        }
 
        if (mode.singleQuote) {
            if (str[i] === "'" && str[i-1] !== '\\') {
                mode.singleQuote = false;
            }
            continue;
        }
 
        if (mode.doubleQuote) {
            if (str[i] === '"' && str[i-1] !== '\\') {
                mode.doubleQuote = false;
            }
            continue;
        }
 
        if (mode.blockComment) {
            if (str[i] === '*' && str[i+1] === '/') {
                str[i+1] = '';
                mode.blockComment = false;
            }
            str[i] = '';
            continue;
        }
 
        if (mode.lineComment) {
            if (str[i+1] === 'n' || str[i+1] === 'r') {
                mode.lineComment = false;
            }
            str[i] = '';
            continue;
        }
 
        if (mode.condComp) {
            if (str[i-2] === '@' && str[i-1] === '*' && str[i] === '/') {
                mode.condComp = false;
            }
            continue;
        }
 
        mode.doubleQuote = str[i] === '"';
        mode.singleQuote = str[i] === "'";
 
        if (str[i] === '/') {
 
            if (str[i+1] === '*' && str[i+2] === '@') {
                mode.condComp = true;
                continue;
            }
            if (str[i+1] === '*') {
                str[i] = '';
                mode.blockComment = true;
                continue;
            }
            if (str[i+1] === '/') {
                str[i] = '';
                mode.lineComment = true;
                continue;
            }
            mode.regex = true;
 
        }
 
    }
    return str.join('').slice(2, -2);
  },
  removeEmptyLine: function (str) {
    var lines = str.split("\n")
    str = []
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim()
      if (line !== "") {
        str.push(line)
      }
    }
    return str.join("\n")
  },
  removeNewLineInStyle: function (str) {
    var lines = str.split("\n")
    str = []
    var styleLine = ""
    var isStyle = false
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i]
      if (isStyle === false) {
        str.push(line)
        
        // 偵測字尾是不是括弧
        if (line.endsWith("{")) {
          
        }
      }
    }
    return str.join("\n")
  },
  countBracketEndIsNotSingleLine: function (str) {
    var count = 0
    var lines = str.split("\n")
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim()
      if (line !== "}" && line.indexOf("}") > -1) {
        count++
      }
    }
    console.log(count)
  },
  countBracketStartIsNotInLineEnd: function (str) {
    var count = 0
    var lines = str.split("\n")
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim()
      if (line.endsWith("{") === false && line.indexOf("{") > -1) {
        count++
      }
    }
    console.log(count)
  },
  reformatSelector: function (str) {
    var selectorHeaderList = []
    var virtualClassName = "puli-style-framework"
    
    var styleList = str.split("}\n")
    for (var i = 0; i < styleList.length; i++) {
      if (styleList[i].trim() === "") {
        continue;
      }
      
      var styleComponents = styleList[i].split("{\n")
      if (styleComponents.length !== 2) {
        throw "出錯了！這個{不能分割為兩個！" + styleComponents.length
      }
      
      var selectorList = styleComponents[0].split(",\n")
      for (var j = 0; j < selectorList.length; j++) {
        var selectorParts = selectorList[j].split(" ")
        var selectorHeader = selectorParts[0]
        
        if (selectorHeader === "html" || selectorHeader === "body") {
          selectorHeader = selectorHeader + " ." + virtualClassName
        }
        else {
          selectorHeader = "." + virtualClassName + " " + selectorHeader
        }
        
        if (selectorHeaderList.indexOf(selectorHeader) === -1) {
          selectorHeaderList.push(selectorHeader)
        }
        
        selectorParts[0] = selectorHeader
        
        selectorList[j] = selectorParts.join(" ")
      }
      
      styleComponents[0] = selectorList.join(",\n")
      
      styleList[i] = styleComponents.join("{\n")
    }
    //console.log(selectorHeaderList)
    return styleList.join("}\n")
  }
};
