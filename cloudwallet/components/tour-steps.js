export default [
    {
        id: "welcome",
        text: [
            `
      <p>Main header which include address Information of metamask connectivity</p>
      <p>Notification DropDownMenu</p>
      <p>Elysium Application dropdown</p>

     
      `
        ],
        attachTo: { element: ".hero-header", on: "top-end" },
        classes: "shepherd profile-bar-dropdown header-tour-modal",
        buttons: [
            {
                type: "cancel",
                classes: "shepherd-button-secondary",
                text: "Close"
            },
            {
                type: "next",
                text: "Next"
            }
        ]
    },
    {
        id: "welcome",
        text: [
            `
            <h6>User Profile </h6>
            <p>User Profile Detail include image of user.</p>
            <p>Wallet Address of user which user can copy </p>
            <p>Balance in LAVA currency</p>
            <p>User can send/Transfer LAVA  option </p>
            <p>Stake Lava</p>
            <p>Export QR code</p> `
        ],
        attachTo: { element: ".profile-bar", on: "left" },
        classes: "shepherd profile-bar-dropdown",
        buttons: [
            {
                type: "cancel",
                classes: "shepherd-button-secondary",
                text: "Close"
            },
            {
                type: "next",
                text: "Next"
            }
        ]
    },
    {
        id: "welcome",
        text: [
            `
        <h6>User Profile </h6>
        <p>User Profile Detail include image of user.</p>
        <p>Wallet Address of user which user can copy </p>
        <p>Balance in LAVA currency</p>
        <p>User can send/Transfer LAVA  option </p>
        <p>Stake Lava</p>
        <p>Export QR code</p>
      `
        ],
        attachTo: { element: ".sideBar", on: "left" },
        classes: "shepherd profile-bar-dropdown SideBar",
        buttons: [
            {
                type: "cancel",
                classes: "shepherd-button-secondary",
                text: "Exit"
            },
            {
                type: "next",
                text: "Close"
            }
        ]
    }
];
