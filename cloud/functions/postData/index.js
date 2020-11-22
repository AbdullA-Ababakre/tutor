const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const { OPENID } = cloud.getWXContext();
  console.log('event', event);
  // let total = await db.collection('parentData').count().total + await db.collection('organizationData').count().total + await db.collection('otherData').count().total
  let c1 = await db.collection('parentData').count()
  let c2 = await db.collection('organizationData').count()
  let c3 = await db.collection('otherData').count()
  let total = c1.total + c2.total +c3.total
  if (event.postFrom === 'parentSubmit') {
		try {
			return await db.collection('parentData').add({
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
          exactAddress: event.exactAddress,
          isVip: 'false',
          detailType : 'familyCourse',
          jobType: '家庭教师',
          orderNumber: total +1,
          favourList: [],
          isLoseEfficacy: false
				}
			});
		} catch (e) {
			console.error(e);
		}
	} else if (event.postFrom === 'organizationSubmit') {
		try {
			return await db.collection('organizationData').add({
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
          exactAddress: event.exactAddress,
          isVip: 'false',
          detailType : 'companyCourse',
          jobType: '机构/企业教师',
          orderNumber: total +1,
          favourList: [],
          isLoseEfficacy: false
				}
			});
		} catch (e) {
			console.error(e);
		}
	} else if (event.postFrom === 'otherSubmit') {
		try {
			return await db.collection('otherData').add({
				data: {
					_openid: OPENID,
					organizationName:event.organizationName,
          positionName:event.positionName,
          positionInfo:event.positionInfo,
          positionSalary:event.positionSalary,
          positionAddress:event.positionAddress,
          recruitNum:event.recruitNum,
          workingTime:event.workingTime,
          isVip: 'false',
          detailType : 'other',
          jobType: '其他岗位',
          orderNumber: total +1,
          favourList: [],
          isLoseEfficacy: false
				}
			});
		} catch (e) {
			console.error(e);
		}
	} else {
		return;
	}
};
