const axios = require('axios');
const _ = require('lodash');

class Lottery {
  constructor() {
    this._dynamicId = "";
    this._oid = "";
    this._number = 1;
  }

  async getLuckyUsers() {
    try {
      if (!this._dynamicId || !this._oid) {
        throw new Error("缺少 dynamicId 或 oid ！");
      }
      console.log(">>>>>> 正在获取评论总条数 <<<<<<");
      let { data } = await axios.get(this.dynamicURL());
      let total = data.data.card.desc.comment;
      if (total == 0) {
        console.log("There are no comments so far!");
        return;
      }
      if (total < this._number) {
        console.log("The number of winning users is greater than the total number of comments!");
        return;
      }
      let pageCount = Math.ceil(total / 20);
      let comments = [];

      console.log(">>>>>> 正在获取用户详情 <<<<<<");
      for (let i = 1; i <= pageCount; i++) {
        let { data } = await axios.get(this.commentsURL(i));
        let list = data.data.replies.map(({ content, member }) => ({
          uname: member.uname,
          mid: member.mid,
          message: content.message
        }))
        comments = comments.concat(list);
      }

      console.log(">>>>>> 正在选取幸运用户 <<<<<<");
      console.log("恭喜中奖用户：");
      _.sampleSize(comments, this._number).forEach(item => {
        console.log(`用户名：${item.uname}，uid：${item.mid}`);
      })
    } catch (e) {
      console.log(e);
    }
  }

  setDynamicId(dynamicId) {
    this._dynamicId = dynamicId;
    return this;
  }

  setOid(oid) {
    this._oid = oid;
    return this;
  }

  setNum(num) {
    this._number = num;
    return this;
  }

  dynamicURL() {
    // 通过动态详情接口获取评论总条数，进而计算出总页数
    return `https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/get_dynamic_detail?dynamic_id=${this._dynamicId}`;
  }

  commentsURL(next = 0) {
    // 通过 next 参数指定哪一页
    // next 不传、传0、传1返回都是第一页
    // 评论每页默认20条
    return `https://api.bilibili.com/x/v2/reply/main?jsonp=jsonp&next=${next}&type=11&oid=${this._oid}`;
  }
}

module.exports = Lottery;