const express = require('express');
const router = express.Router();
require('dotenv').config();

router.post('/', (req, res) => {
    const { phoneNumber } = req.body;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authkey", process.env.AUTH_KEY);
    var raw = JSON.stringify({
      integrated_number: process.env.INTEGRATED_NO,
      content_type: "template",
      payload: {
        messaging_product: "whatsapp",
        type: "template",
        template: {
          name: "sgdms1",
          language: {
            code: "en",
            policy: "deterministic",
          },
          namespace: null,
          to_and_components: [
            {
              to: [phoneNumber],
              components: {
                button_1: {
                  subtype: "url",
                  type: "text",
                  value: process.env.APP_LINK,
                },
              },
            },
          ],
        },
      },
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch(
        "https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/",
        requestOptions
    )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
});

router.get('/', (req, res) => {
    return res.json({ message: "Whats app route is working fine!" })
});            


module.exports = router