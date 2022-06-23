/**
 - Create By ZackMans Official
 - Contact Me on https://wa.me/+6281385062956
 - Follow iG : @salman_alfarizj_15
 - Thanks Dika Ardnt
*/

require("./config.js")
const { default: mansConnect, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@adiwajshing/baileys")
const { state, saveState } = useSingleFileAuthState(`./${sessionName}.json`)
const pino = require('pino')
const fs = require('fs')
const chalk = require('chalk')
const FileType = require('file-type')
const cron = require("node-cron");
const path = require('path')
const { exec, spawn, execSync } = require("child_process")
const moment = require('moment-timezone')
const PhoneNumber = require('awesome-phonenumber')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, jsonformat, await, sleep } = require('./lib/myfunc')
const Database = require('./lib/database.js')
const dbs = new Database()

// Buat Uptime Replit
// require("http").createServer((_, res) => res.end("Hallo World!")).listen(8080)

const Store = require("./lib/Store.js") //makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

async function startMans() {
let { version, isLatest } = await fetchLatestBaileysVersion()
const mans = mansConnect({
logger: pino({ level: 'silent' }),
printQRInTerminal: true,
browser: ['Mans Multi Device','Safari','1.0.0'],
auth: state,
version
})

const store = Store.bind(mans)

mans.ws.on('CB:call', async (json) => {
if (anticals === true) {
const callerId = json.content[0].attrs['call-creator']
if (json.content[0].tag == 'offer') {
//let pa7rick = await mans.sendContact(callerId, global.owner)
mans.sendMessage(callerId, { text: `Sistem otomatis block!\nJangan menelpon bot!\nSilahkan Hubungi Owner Untuk Dibuka !`})
await sleep(8000)
await mans.updateBlockStatus(callerId, "block")
}
}
})

mans.ev.on('messages.upsert', async chatUpdate => {
try {
mek = chatUpdate.messages[0]
if (!mek.message) return
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
if (!mans.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
m = smsg(mans, mek, store)
require("./zackm")(mans, m, chatUpdate, store)
} catch (err) {
console.log(err)
}
})

mans.ev.on('groups.update', async(anu) => {
console.log(anu)
try {
ppgroup = await mans.profilePictureUrl(anu[0].id, 'image')
} catch {
ppgroup = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
try {
if (anu[0].announce === true) {
teks = `     「 Group Setting Change 」

Group telah ditutup oleh admin, sekarang hanya admin yang dapat mengirim pesan!`
let buttons = [
{buttonId: `menu`, buttonText: {displayText: 'Menu'}, type: 1}
]
let buttonMessage = {
image: {url:ppgroup},
caption: teks,
footer: "© By Riyadh",
buttons: buttons,
headerType: 4,
}
mans.sendMessage(anu[0].id, buttonMessage)
} else if (anu[0].announce === false) {
teks = `     「 Group Setting Change 」

Group telah dibuka oleh admin, sekarang semua peserta dapat mengirim pesan!`
let buttons = [
{buttonId: `menu`, buttonText: {displayText: 'Menu'}, type: 1}
]
let buttonMessage = {
image: {url:ppgroup},
caption: teks,
footer: "© Riyadh",
buttons: buttons,
headerType: 4,
}
mans.sendMessage(anu[0].id, buttonMessage)
}
} catch(err) {
mans.sendMessage(anu[0].id, {text:String(err)})
}
})

mans.ev.on('group-participants.update', async (anu) => {
console.log(anu)
try {
let metadata = await mans.groupMetadata(anu.id)
let participants = anu.participants
let behys = anu.participants.length
let botNumber = await mans.decodeJid(mans.user.id)
let groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
let isBotAdmins = m.isGroup ? groupAdmins.includes() : false
const wjoin = wjoind.find(i => m.isGroup ? i.jid.includes(anu.id) : false)
const wleave = wleaved.find(i => m.isGroup ? i.jid.includes(anu.id) : false)
for (let num of participants) {
// Get Profile Picture User
try {
ppuser = await mans.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}

// Get Profile Picture Group
try {
ppgroup = await mans.profilePictureUrl(anu.id, 'image')
} catch {
ppgroup = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
if (anu.action == 'add') {
if ("120363025425953421@g.us".includes(anu.id)){
mans.sendMessage(num, {image:thum, caption:"Jika kamu ingin menambahkan namamu di thanksto bot kamu harus mengetik thanksto <namamu>"})
}
if (gcrevoke.includes(anu.id)) {
if (!isBotAdmins) return
mbcs = `*| AUTO REVOKE LINK GROUP |*

Jika ingin mematikan fitur auto revoke link group ketik autorevoke off atau anda bisa mengklik tombol dibawah

Link group akan direset dalam 5 detik lagi!!`
let buttons = [
{buttonId: `autorevoke off`, buttonText: {displayText: 'Nonaktifkan'}, type: 1}
]
let buttonMessage = {
image: log0,
jpegThumbnail: thum,
caption: mbcs,
footer: "© Pablo`Botz",
buttons: buttons,
headerType: 4,
}
mans.sendMessage(anu.id, buttonMessage)
await sleep(5000)
mans.groupRevokeInvite(m.chat)
} 
if (!wlcm.includes(anu.id)) return
hesa = `${participants}`
mestes = (teks) => {
return teks.replace(/['@s whatsapp.net']/g, " ");
}
resa = `${mestes(hesa)}`
const jm = moment.tz('Asia/Jakarta').format('HH:mm:ss')
let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let calender = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
exec(`magick './media/image/wel.jpg' -gravity west -fill '#ffffff' -font './media/font/font-gue.ttf' -size 1280x710 -pointsize 75 -interline-spacing 7.5 -annotate +460-47 '${resa}' -pointsize 51 -annotate +460+83 '${jm} ${calender}' -pointsize 48 -annotate +100+230 'MEMBER + ${behys}' -pointsize 63 -annotate +460+200 'Welcome To ${metadata.subject}' '${ppuser}' -resize %[fx:t?u.w*0.2:u.w]x%[fx:?u.h*0.2:u.h] -gravity center -geometry -430+66 -composite './storage/hasil.jpg'`)
.on('error', () => mans.sendMessage(anu.id, {text:'error'}))
.on('exit', () => {
if (wjoin) {
var has = wjoind.find( i => i.jid == anu.id)
mbc = `${has.message.replace(/@user/gi, "@" + num.split("@")[0]).replace(/@subject/gi, metadata.subject)}`
} else {
mbc = `Welcome To ${metadata.subject}

@${num.split("@")[0]} Jika ingin melihat list menu klik tombol menu dibawah

jika tombol tidak terlihat di whatsapp versi lama atau mod kalian mengetik menu untuk melihat list menu`
}
let buttons = [
{buttonId: `menu`, buttonText: {displayText: 'Menu'}, type: 1}
]
let buttonMessage = {
image: fs.readFileSync("./storage/hasil.jpg"),
caption: mbc,
footer: "© Riyadh APIs - X - Emilia Official",
mentions:[num],
buttons: buttons,
headerType: 4,
}
mans.sendMessage(anu.id, buttonMessage)
})
if (autkick.includes(anu.id)) {
bandUsd = await mans.fetchBlocklist()
bande = bandUsd ? bandUsd.includes(num) : false
if (!bande) return
if (!isBotAdmins) return
mans.groupParticipantsUpdate(anu.id, [num], 'remove')
tesgd = `*| AUTO KICK USER BLOCK |*

Jika ingin mematikan fitur autokick user block ketik autokick off atau anda bisa mengklik tombol dibawah

@${num.split("@")[0]} telah dikick karena dia telah dibanned oleh owner bot`
let buttons = [
{buttonId: `autokick off`, buttonText: {displayText: 'Nonaktifkan'}, type: 1}
]
let buttonMessage = {
image: log0,
jpegThumbnail: thum,
caption: tesgd,
footer: "© Riyadh APIs - X - Emilia Official",
buttons: buttons,
mentions: [num],
headerType: 4,
}
mans.sendMessage(anu.id, buttonMessage)
} 
} else if (anu.action == 'remove') {
if (!wlcm.includes(anu.id)) return
hesa = `${participants}`
mestes = (teks) => {
return teks.replace(/['@s whatsapp.net']/g, " ");
}
resa = `${mestes(hesa)}`
const jamny = moment.tz('Asia/Jakarta').format('HH:mm:ss')
let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 Janua@ri 2021').getTime()
let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let calender = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
exec(`magick './media/image/lev.jpg' -gravity west -fill '#ffffff' -font './media/font/font-gue.ttf' -size 1280x710 -pointsize 75 -interline-spacing 7.5 -annotate +460-47 '${resa}' -pointsize 51 -annotate +460+83 '${jamny} ${calender}' -pointsize 48 -annotate +100+230 'MEMBER - ${behys}' -pointsize 63 -annotate +460+200 'Leaving from ${metadata.subject}' '${ppuser}' -resize %[fx:t?u.w*0.2:u.w]x%[fx:?u.h*0.2:u.h] -gravity center -geometry -430+66 -composite './storage/hasild.jpg'`)
.on('error', () => mans.sendMessage(m.chat, {text:'error'}))
.on('exit', () => {
if (wleave) {
var has = wleaved.find( i => i.jid == anu.id)
mbcd = `${has.message.replace(/@user/gi, "@" + num.split("@")[0]).replace(/@subject/gi, metadata.subject)}`
} else {
mbcd = `@${num.split("@")[0]} Leaving To ${metadata.subject}`
}
mans.sendMessage(anu.id, { image: fs.readFileSync("./storage/hasild.jpg"), contextInfo: { mentionedJid: [num] }, caption: mbcd })
})
}
}
} catch (err) {
console.log(err)
mans.sendMessage(anu.id, {text:String(err)})
}
})

// Setting
mans.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

mans.ev.on('contacts.update', update => {
for (let contact of update) {
let id = mans.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

mans.getName = (jid, withoutContact  = false) => {
id = mans.decodeJid(jid)
withoutContact = mans.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = mans.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === mans.decodeJid(mans.user.id) ?
mans.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

mans.sendContact = async (jid, kon, quoted = '', opts = {}) => {
let list = []
for (let i of kon) {
list.push({
displayName: await mans.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await mans.getName(i + '@s.whatsapp.net')}\nFN:${await mans.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:bundasarimbit@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://instagram.com/bangreyy_54\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
})
}
mans.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
}

mans.setStatus = (status) => {
mans.query({
tag: 'iq',
attrs: {
to: '@s.whatsapp.net',
type: 'set',
xmlns: 'status',
},
content: [{
tag: 'status',
attrs: {},
content: Buffer.from(status, 'utf-8')
}]
})
return status
}

mans.public = true

mans.serializeM = (m) => smsg(mans, m, store)

mans.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
let reason = lastDisconnect.error ? lastDisconnect?.error?.output.statusCode : 0;
if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); process.exit(); }
else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); startMans(); }
else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); startMans(); }
else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); process.exit(); }
else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Delete Session and Scan Again.`); process.exit(); }
else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); startMans(); }
else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); startMans(); }
else { console.log(`Unknown DisconnectReason: ${reason}|${connection}`) }
}
console.log('Connected...', update)
})

mans.ev.on('creds.update', saveState)

// Add Other

/** Send Button 5 Image
 *
 * @param {*} jid
 * @param {*} text
 * @param {*} footer
 * @param {*} image
 * @param [*] button
 * @param {*} options
 * @returns
 */
mans.send5ButImg = async (jid , text = '' , footer = '', img, but = [], thumb, options = {}) =>{
let message = await prepareWAMessageMedia({ image: img, jpegThumbnail:thumb }, { upload: mans.waUploadToServer })
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
imageMessage: message.imageMessage,
"hydratedContentText": text,
"hydratedFooterText": footer,
"hydratedButtons": but
}
}
}), options)
mans.relayMessage(jid, template.message, { messageId: template.key.id })
}

/**
 * 
 * @param {*} jid 
 * @param {*} buttons 
 * @param {*} caption 
 * @param {*} footer 
 * @param {*} quoted 
 * @param {*} options 
 */
mans.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
let buttonMessage = {
text,
footer,
buttons,
headerType: 2,
...options
}
mans.sendMessage(jid, buttonMessage, { quoted, ...options })
}

/**
 * 
 * @param {*} jid 
 * @param {*} text 
 * @param {*} quoted 
 * @param {*} options 
 * @returns 
 */
mans.sendText = (jid, text, quoted = '', options) => mans.sendMessage(jid, { text: text, ...options }, { quoted })

/**
 * 
 * @param {*} jid 
 * @param {*} path 
 * @param {*} caption 
 * @param {*} quoted 
 * @param {*} options 
 * @returns 
 */
mans.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await mans.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

/**
 * 
 * @param {*} jid 
 * @param {*} path 
 * @param {*} caption 
 * @param {*} quoted 
 * @param {*} options 
 * @returns 
 */
mans.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await mans.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
}

/**
 * 
 * @param {*} jid 
 * @param {*} path 
 * @param {*} quoted 
 * @param {*} mime 
 * @param {*} options 
 * @returns 
 */
mans.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await mans.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
}

/**
 * 
 * @param {*} jid 
 * @param {*} text 
 * @param {*} quoted 
 * @param {*} options 
 * @returns 
 */
mans.sendTextWithMentions = async (jid, text, quoted, options = {}) => mans.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

/**
 * 
 * @param {*} jid 
 * @param {*} path 
 * @param {*} quoted 
 * @param {*} options 
 * @returns 
 */
mans.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}

await mans.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

/**
 * 
 * @param {*} jid 
 * @param {*} path 
 * @param {*} quoted 
 * @param {*} options 
 * @returns 
 */
mans.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}

await mans.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}
mans.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
let types = await mans.getFile(path, true)
let { mime, ext, res, data, filename } = types
if (res && res.status !== 200 || file.length <= 65536) {
try { throw { json: JSON.parse(file.toString()) } }
catch (e) { if (e.json) throw e.json }
}
let type = '', mimetype = mime, pathFile = filename
if (options.asDocument) type = 'document'
if (options.asSticker || /webp/.test(mime)) {
let { writeExif } = require('./lib/exif')
let media = { mimetype: mime, data }
pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
await fs.promises.unlink(filename)
type = 'sticker'
mimetype = 'image/webp'
}
else if (/image/.test(mime)) type = 'image'
else if (/video/.test(mime)) type = 'video'
else if (/audio/.test(mime)) type = 'audio'
else type = 'document'
await mans.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
return fs.promises.unlink(pathFile)
}
/**
 * 
 * @param {*} message 
 * @param {*} filename 
 * @param {*} attachExtension 
 * @returns 
 */
mans.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
// save to file
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

mans.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}

return buffer
 } 

/**
 * 
 * @param {*} jid 
 * @param {*} message 
 * @param {*} forceForward 
 * @param {*} options 
 * @returns 
 */
mans.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}
}

let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await mans.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}

mans.cMod = (jid, copy, text = '', sender = mans.user.id, options = {}) => {
//let copy = message.toJSON()
let mtype = Object.keys(copy.message)[0]
let isEphemeral = mtype === 'ephemeralMessage'
if (isEphemeral) {
mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
}
let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
let content = msg[mtype]
if (typeof content === 'string') msg[mtype] = text || content
else if (content.caption) content.caption = text || content.caption
else if (content.text) content.text = text || content.text
if (typeof content !== 'string') msg[mtype] = {
...content,
...options
}
if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
copy.key.remoteJid = jid
copy.key.fromMe = sender === mans.user.id

return proto.WebMessageInfo.fromObject(copy)
}


/**
 * 
 * @param {*} path 
 * @returns 
 */
mans.getFile = async (PATH, save) => {
let res
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
//if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'
}
filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
if (data && save) fs.promises.writeFile(filename, data)
return {
res,
filename,
size: await getSizeMedia(data),
...type,
data
}

}
mans.sendFile = async(jid, PATH, fileName, quoted = {}, options = {}) => {
let types = await mans.getFile(PATH, true)
let { filename, size, ext, mime, data } = types
let type = '', mimetype = mime, pathFile = filename
if (options.asDocument) type = 'document'
if (options.asSticker || /webp/.test(mime)) {
let { writeExif } = require('./lib/sticker.js')
let media = { mimetype: mime, data }
pathFile = await writeExif(media, { packname: global.packname, author: global.packname2, categories: options.categories ? options.categories : [] })
await fs.promises.unlink(filename)
type = 'sticker'
mimetype = 'image/webp'
}
else if (/image/.test(mime)) type = 'image'
else if (/video/.test(mime)) type = 'video'
else if (/audio/.test(mime)) type = 'audio'
else type = 'document'
await mans.sendMessage(jid, { [type]: { url: pathFile }, mimetype, fileName, ...options }, { quoted, ...options })
return fs.promises.unlink(pathFile)
}
mans.parseMention = async(text) => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

return mans
}

startMans()


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
