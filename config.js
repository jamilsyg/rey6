/**
 - Create By ZackMans Official
 - Contact Me on https://wa.me/+6281385062956
 - Follow iG : @salman_alfarizi_15
*/

const fs = require("fs")
const chalk = require("chalk")

// Other
global.thum = fs.readFileSync("./media/image/thumb.jpg")
global.log0 = fs.readFileSync("./media/image/mans.jpg")
global.err4r = fs.readFileSync("./media/image/error.jpg")
global.owner = ['6289675134806']
global.rkyt = []
global.ntilink = ['6289675134806-1597035781@g.us']
global.ntihide = ['120363043965529911@g.us']
global.ntidel = ['6289675134806-1597035781@g.us']
global.wlcm = ['6289675134806-1597035781@g.us']
global.autkick = ['120363043965529911@g.us']
global.gcrevoke = ['16472412324-1386525986@g.us']
global.wjoind = []
global.wleaved = []
global.packname = "Emilia-MD"
global.packname2 = "@bangreyy_54"
global.author = "By Riyadh"
global.sessionName = "session"
global.linkgrupss = "https://chat.whatsapp.com/ID2jE6SjAzS8fayx8WWBJH"
global.antitags = true
global.autred = true
global.anticals = true
global.prefa = ['','!','.','🐦','🐤','🗿']
global.mess = {
    success: 'Success',
    admin: 'Fitur Khusus Admin Group Kontol!',
    botAdmin: 'Bot Harus Menjadi Admin Terlebih Dahulu!',
    owner: 'Lu Siapa Fitur Khusus Owner Bot Kontol',
    group: 'Fitur Digunakan Hanya Untuk Group Kontol!',
    private: 'Fitur Digunakan Hanya Untuk Private Chat!',
    bot: 'Fitur Khusus Pengguna Nomor Bot',
    wait: 'Loading Kak Sabar...',
    linkm: 'Linknya Mana Kak?',
    ban: 'Kamu telah dibanned oleh owner, Jika ingin di unbanned chat owner'
}
global.limitawal = {
    rakyat: "Infinity",
    free: 45
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
