/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.Loader.setPath({
    'Ext': 'touch/src',
    'myschoolishness': 'app'
})

//Ext.Loader.setConfig({
//disableCaching: false 
//})

//</debug>

Ext.require([
    'Ext.direct.*',
    'myschoolishness.controller.Utils',
    'Ext.MessageBox'
]);

Ext.onReady(function(){
	//console.log("ExtRemote.REMOTING_API-> " + ExtRemote.REMOTING_API);
    Ext.direct.Manager.addProvider(ExtRemote.REMOTING_API); //Must match namespace and apiName defined in node.js server
});

Ext.application({
     name: 'myschoolishness',
    views: ['SignaturePad','SignOutView','BulletinHome','MySchoolHome','MyClassHome','MyKidsHome','Register','UserAgreement','ViewBulletinDetails','SignaturePanel','ChooseClassWindow','ForgotPassword','BulletinsClassroomsPanel','BulletinCrudCard','BulletinDetails','EditBulletin','UserRolesPanel','ChooseParentsWindow','DirectoryBirthdays','ManageBulletins','StudentInvitePanel','StudentParentsPanel','EditStudent','ManageParents','UserPasswordForm','UserProfilePanel','UserAddressForm','UserContactInfoPanel','StudentDetailsPanel','StudentClassGradePanel','StudentNamePanel','RotatingCarousel','BulletinBoard','EnterTimeWindow','ManageStudents','ChildCrudCard','UserCrudCard','Login','Main','Forgot','AbsenceHome','AbsenceRollCall','AbsenceEdit','AbsenceAllStaff','AbsenceAllStudent','AbsenceMyKids','AbsentManageStudents','AbsentManageStaff','DirectoryHome','DirectoryStudents','DirectoryStaff','DirectoryFamily','DirectoryStaffDetail','EditUser','AdminHome','AbsenceList'],
    controllers:['Signature','MyKids','Login','Absence','Directory','Admin'],
    stores:['CheckSignedOutStore','InsertSignatureStore','MyKidsStore','SettingCategoriesStore','ParentsSettingCategoriesStore','UserAdminCategoriesStore','UserTeacherCategoriesStore','ContentStore','UsersStore','AssociateUserSchoolStore','DeleteBulletinStore','SaveBulletinStore','BulletinClassAssociationStore','CheckEmailTokenStore','SendEmailStore','ClassroomForBulletinIdStore','BulletinByIdStore','DeleteUserStore','DeleteStudentStore','ParentStudentAssociationStore','StateStore','CheckDuplicateEmailStore','DirectoryBirthdaysStore','CheckTokenStore','TokenStore','AllBulletinsForAdminScreenStore','GetParentsForStudentStore','UserByIdStore','ParentsStore','ClassroomStore','GradesStore','AllBulletinsStore','AbsentGetByIdStore','AbsentCheckForDuplicatesStore','Ext.data.Store','UserStore','AttendanceStore','AbsentStore','AbsentInsertStore','AbsentSingleStudentStore','AbsentDeleteStore','AbsenceStaffMemberStore','AbsenceAllStaffStore','AbsenceAllStudentStore','AbsenceMyKidsStore','AbsentManageStudentsStore','DirectoryStudentsStore','AbsentManageStaffStore','DirectoryStaffStore','DirectoryFamilyStore','GetStudentStore','StudentInsertStore','UserInsertStore'],
    models:['CheckSignedOutModel','InsertSignatureModel','MyKidsModel','CategoryModel','ContentModel','UsersModel','AssociateUserSchoolModel','DeleteBulletinModel','SaveBulletinModel','BulletinClassAssociationModel','CheckEmailTokenModel','SendEmailModel','ClassroomForBulletinIdModel','BulletinByIdModel','DeleteUserModel','DeleteStudentModel','ParentStudentAssociationModel','StateModel','CheckDuplicateEmailModel','DirectoryBirthdaysModel','DirectoryBirthdaysModel','CheckTokenModel','TokenModel','AllBulletinsForAdminScreenModel','GetParentsForStudentModel','UserByIdModel','ParentsModel','ClassroomModel','GradesModel','AllBulletinsModel','AbsentGetByIdModel','AbsentCheckForDuplicatesModel','DirectoryStaffModel','DirectoryFamilyModel','DirectoryStudentsModel','UserModel','LoginModel','AttendanceModel','AbsentModel','AbsentInsertModel','AbsentSingleStudentModel','AbsentDeleteModel','AbsenceStaffMemberModel','AbsenceAllStaffModel','AbsenceAllStudentModel','AbsenceMyKidsModel','AbsentManageStudentsModel','AbsentManageStaffModel','GetStudentModel','StudentInsertModel','UserInsertModel'],
    requires: [
        'Ext.data.Store',
        'myschoolishness.controller.Directory',
        'myschoolishness.controller.Login',
        'Ext.direct.*'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

	testFunction: function() {
		console.log("TEST WORKS");
	},
	
    launch: function() {     
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
		Ext.Msg.defaultAllowedConfig.showAnimation = false;
        // Initialize the main view
        //Ext.Viewport.add(Ext.create('myschoolishness.view.Login'));
    	Ext.Viewport.add([
      	          	    {xtype: 'loginview'},
      	          	    {xtype: 'forgotview'},
      	          	    //{xtype: 'mainview'},
      	          	    {xtype: 'edituserview'},
      	          	    {xtype: 'editstudentview'},
      	          	    {xtype: 'absence-home'},
      	          	    {xtype: 'absence-rollcall'},
      	          	    {xtype: 'absence-edit'},
      	          	    {xtype: 'absence-allstudents'},
      	          	    {xtype: 'absence-allstaff'},
      	          	    {xtype: 'directory-home'},
      	          	    {xtype: 'directory-family'},
      	          	    {xtype: 'directory-staff'},
      	          	    {xtype: 'directory-students'},
      	          	    {xtype: 'directory-staff-detail'},
      	          	    {xtype: 'userCrudCard'},
      	          	    {xtype: 'childCrudCard'},
      	          	    {xtype: 'admin-home'},
      	          	    {xtype: 'manage-students'},
      	          	    {xtype: 'bulletin-board'},
      	          	    {xtype: 'rotating-carousel'},
      	          	    {xtype: 'student-name-panel'},
      	          	    {xtype: 'student-student-class-grade-panel'},
      	          	    {xtype: 'student-details-panel'},
      	          	    {xtype: 'user-contact-info-panel'},
      	          	    {xtype: 'user-address-form'},
      	          	    {xtype: 'user-profile-panel'},
      	          	    {xtype: 'user-password-form'},
      	          	    {xtype: 'manage-parents'},
      	          	    {xtype: 'student-parents-panel'},
      	          	    {xtype: 'student-invite-panel'},
      	          	    {xtype: 'manage-bulletins'},
      	          	    {xtype: 'directory-birthdays'},
      	          	    {xtype: 'choose-parents'},
      	          	    {xtype: 'absenceList'},
      	          	    {xtype: 'user-roles-panel'},
      	          	    {xtype: 'editbulletinview'},
      	          	    {xtype: 'bulletindetails'},
      	          	    {xtype: 'bulletincrudcard'},
      	          	    {xtype: 'bulletins-classrooms-panel'},
      	          	    {xtype: 'choose-class'},
      	          	    {xtype: 'forgot-password-panel'},
      	          	    {xtype: 'signatureview'},
      	          	    {xtype: 'user-agreement-panel'},
      	          	    {xtype: 'register'},
      	          	    //{xtype: 'my-kids-home'},
      	          	    {xtype: 'class-home'},
      	          	    {xtype: 'bulletin-home'},
      	          	    {xtype: 'viewbulletindetails'},
      	          	    {xtype: 'signaturepad'},
      	          	    {xtype: 'signoutview'}
      	          	    
      	          	]);

    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
