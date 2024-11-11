const { UserInfoModel } = require("../model/userInfoModel");
const { User } = require("../model/userModel")

const validateUserRole = async (userId, expectedRole) => {
    const user = await User.findById(userId);
    const userInfo = await UserInfoModel.findOne({userId:userId})
    if (!user) {
        throw new Error(`User ID ${userId} not found`);
    }
    if (userInfo.role !== expectedRole) {
        throw new Error(`User ID ${userId} does not have ${expectedRole} role`);
    }
    return user._id
}
const validateContributorIds = async (contributorId) => {
    const validIds = await Promise.all(contributorId.map(id => validateUserRole(id, 'Contributor')))
    return validIds;
}
module.exports = {
    validateUserRole,
    validateContributorIds,
}
