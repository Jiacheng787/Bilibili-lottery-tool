const Lottery = require("./Lottery");

let lottery = new Lottery();

// dynamicId 大于 2^53，超出 Number 类型可以精确表示的范围，因此使用字符串
lottery
  .setDynamicId("526817746483513832")
  .setOid("135311662")
  .setNum(2)
  .getLuckyUsers();