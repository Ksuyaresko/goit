const contact = require('./contacts.js');
const { Command } = require('commander');
const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            (async () => {
                try {
                    console.log(await contact.listContacts());
                } catch (e) {
                    console.error('error', e)
                }
            })()
            break;

        case 'get':
            // ... id
            (async () => {
                try {
                    console.log(await contact.getContactById(id));
                } catch (e) {
                    console.error('error', e)
                }
            })()
            break;

        case 'add':
            // ... name email phone
            (async () => {
                try {
                    console.log(await contact.addContact(name, email, phone));
                } catch (e) {
                    console.error('error', e)
                }
            })()
            break;

        case 'remove':
            // ... id
            (async () => {
                try {
                    console.log(await contact.removeContact(id));
                } catch (e) {
                    console.error('error', e)
                }
            })()
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);
