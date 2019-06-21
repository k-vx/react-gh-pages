export const Utils = {
  djangoDateTimeStrToShowingStr: function (djangoDateTimeStr) {
    let showingStr = djangoDateTimeStr.toLocaleString('en-US', {
      timeZone: 'Asia/shanghai',
      timeZoneName: 'short',
      hour12: false,
    });
    return showingStr;
  },

  strToSpaceStr: function (str) {
    //str like macine_test_guide, return 'machine test guide'
    let new_str;
    if (str.indexOf('_') != -1) {
      // let words = str.split('_');
      // words.map((word) => {
      //   return word.
      // })
      new_str = str.replace(/_/g, ' ');
      return new_str;
    }
    return str;
  },
};