// Description:
//   Australised hubot methods
//
// Commands:
//   hubot 시간|time - 호주 시간을 알려 드립니다.
//   hubot image me <query> - 이게 뭔가요.
//   hubot animate me <query> - 이건 또 뭔가요.

const moment = require('moment-timezone');
let prefix = ":koala:";
let timezones = [
  {'en': 'Melbourne', 'ko': '멜버른'},
  {'en': 'Sydney', 'ko': '시드니'},
  {'en': 'Hobart', 'ko': '호바트'},
  {'en': 'Canberra', 'ko': '캔버라'},
  {'en': 'Adelaide', 'ko': '아들레이드'},
  {'en': 'Brisbane', 'ko': '브리즈번'},
  {'en': 'Darwin', 'ko': '다윈'},
  {'en': 'Perth', 'ko': '퍼스'}];

let get_time = function(timestring, lang) {
  let timeformat = 'h:mm a';
  let time = moment.tz(`Australia/${timestring.en}`).format(timeformat);
  if (lang === 'en') {
    var result;
    return result = `${timestring.en} ${time}`;
  } else {
    var result;
    return result = `${timestring.ko} ${time}`;
  }
};

let no_function = function(msg) {
  msg.send(`${prefix} 저는 그런 기능 없는데요...`);
  let message = msg.message.text.substr(msg.message.text.indexOf(" ") + 1); 
  return msg.send(`@weirdbot ${message}`);
};

let au_time = function(msg, lang) {
  let time = (timezones.map((timezone) => get_time(timezone, lang)));
  if (lang === "en") {
    msg.send(`${prefix} Current time in Australia.`);
  } else {
    msg.send(`${prefix} 현재 호주 시각입니다.`);
  }
  return msg.send(time.join(",  "));
};

module.exports = function(robot) {
  robot.respond(/(image|img)( me)? (.*)/i, msg => no_function(msg)
  );

  robot.respond(/animate( me)? (.*)/i, msg => no_function(msg)
  );

  robot.respond(/TIME/i, msg => au_time(msg, "en")
  );

  robot.respond(/(시간|시각)/i, msg => au_time(msg, "ko")
  );

  robot.hear(/(australia|oz|au|koala|kangaroo|melbourne|sydney)( )?time/i, msg => au_time(msg, "en")
  );

  return robot.hear(/(멜버른|멜번|시드니|호바트|캔버라|아들레이드|브리즈번|블번|다윈|퍼스|호주)( )?(시간|시각)/i, msg => au_time(msg, "ko")
  );
};
