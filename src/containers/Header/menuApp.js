export const adminMenu = [
    { //quan ly nguoi dung
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage',
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'
            // },
            { //Quản lý kế hoạch khám bệnh của bác sĩ
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',
            }
        ]
    },
    { //quan ly phong kham
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
        ]
    },
    { //quan ly chuyen khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
        ]
    },
    { //quan ly cam nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },
        ]
    },
];

export const doctorMenu = [
    { //Quản lý kế hoạch khám bệnh của bác sĩ
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',
            },
            {
                name: 'list A',
                subMenus: [
                    {
                        name: 'sub-list4',
                    },
                    {
                        name: 'sub-list5',
                    },
                    {
                        name: 'sub-list6'
                    }
                ]
            },
            {
                name: 'List B',
                subMenus: [
                    {
                        name: 'sub-list1',
                    },
                    {
                        name: 'sub-list2',
                    },
                    {
                        name: 'sub-list3'
                    }
                ]
            }
        ]

    },
    {
        name: 'menu2',
        menus: [
            {
                name: 'sub-list0',
            },
            {
                name: 'sub-list1'
            },
            {
                name: 'sub-list2'
            }
        ]
    },
    {
        name: 'menu2',
        menus: [
            {
                name: 'sub-list0',
            },
            {
                name: 'sub-list1'
            },
            {
                name: 'sub-list2'
            }
        ]
    }

];