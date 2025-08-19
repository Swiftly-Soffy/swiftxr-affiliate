module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    if (data.Likes == null) data.Likes = 0;
    if (data.Views == null) data.Views = 0;
  },
  beforeUpdate(event) {
    const { data } = event.params;
    if (data.Likes == null) data.Likes = 0;
    if (data.Views == null) data.Views = 0;
  },
};
