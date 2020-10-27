const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const { OPENID } = cloud.getWXContext();
	console.log('event', event);
	if (event.postFrom === 'parentSubmit') {
		try {
			return await db.collection('parentSubmit').add({
				data: {
					_openid: OPENID,
					gradeChecked: event.gradeChecked,
					genderChecked: event.genderChecked,
					classForm: event.classForm,
					tutorType: event.tutorType,
					tutorSubject: event.tutorSubject,
					tutorGoal: event.tutorGoal,
					studentInfo: event.studentInfo,
					teacherGenderChecked: event.teacherGenderChecked,
					teacherRequire: event.teacherRequire,
					teacherRequireText: event.teacherRequireText,
					salarySelectorChecked: event.salarySelectorChecked,
					teacherRequirementTag: event.teacherRequirementTag,
					tel: event.tel,
					teachingDay: event.teachingDay,
					tutorDuration: event.tutorDuration,
					teachingTime: event.teachingTime,
					teachingTimeTag: event.teachingTimeTag,
					addressSelectorChecked: event.addressSelectorChecked,
					exactAddress: event.exactAddress
				}
			});
		} catch (e) {
			console.error(e);
		}
	} else if (event.postFrom === 'organizationSubmit') {
		try {
			return await db.collection('organizationSubmit').add({
				data: {
					_openid: OPENID,
					gradeChecked: event.gradeChecked,
					tutorType: event.tutorType,
					tutorSubject: event.tutorSubject,
					positionInfo: event.positionInfo,
					teacherRequireText: event.teacherRequireText,
					salarySelectorChecked: event.salarySelectorChecked,
					tel: event.tel,
					organizationName: event.organizationName,
					recruitNum: event.recruitNum,
					teachingDay: event.teachingDay,
					tutorDuration: event.tutorDuration,
					teachingTime: event.teachingTime,
					teachingTimeTag: event.teachingTimeTag,
					addressSelector: event.addressSelector,
					addressSelectorChecked: event.addressSelectorChecked,
					exactAddress: event.exactAddress
				}
			});
		} catch (e) {
			console.error(e);
		}
	} else if (event.type === 'otherSubmit') {
		try {
			return await db.collection('otherSubmit').add({
				data: {
					_openid: OPENID,
					organizationName:event.organizationName,
                    positionName:event.positionName,
                    positionInfo:event.positionInfo,
                    positionSalary:event.positionSalary,
                    positionAddress:event.positionAddress,
                    recruitNum:event.recruitNum,
                    workingTime:event.workingTime
				}
			});
		} catch (e) {
			console.error(e);
		}
	} else {
		return;
	}
};
