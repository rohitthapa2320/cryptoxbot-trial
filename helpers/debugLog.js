const debugLog={
    filePath: '',
    funCalled: '',
    print: (label ,message) => {
      console.log(debugLog.filePath, debugLog.funCalled, label, message);
    }
  };

module.exports= debugLog;









