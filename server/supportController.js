module.exports = {
    supportTicket: (req, res) => {
        // send email to ourselves here with support ticket details OR log it in a DB somewhere that we can look it up
        return res.status(200).send('ok');
    }
}