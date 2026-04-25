import sequelizeORM from "../infrastructure/connection";
import PollValues from "./poll_values";
import Polls from "./polls";
import User from "./user";

const UserVotes = sequelizeORM.define(
  "user_votes",
  {},
  {
    paranoid: true,
    deletedAt: "destroyTime",
  },
);
UserVotes.removeAttribute("id");

Polls.hasMany(UserVotes, {
  foreignKey: "pollId",
});
PollValues.hasMany(UserVotes);
User.hasMany(UserVotes);
UserVotes.belongsTo(User);
UserVotes.belongsTo(Polls);
UserVotes.belongsTo(PollValues);
UserVotes.removeAttribute("PollId");
export default UserVotes;
