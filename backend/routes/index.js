import express from "express";
import puppeteer from 'puppeteer';
import cheerio from "cheerio"
import path from "path";

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), '../frontend/dist/index.html'));
});

router.post('/api/get-sources', async (req, res) => {
    try {
        let url = req.body.url;
        let browser = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            defaultViewport: {width: 1920, height: 1080},
            args: [`--window-size=1920,1080`],
            headless: 'new',
            ignoreDefaultArgs: ['--disable-extensions', '--ignore-certificate-errors'],
        })
        let page = await browser.newPage()
        await page.goto(url, {waitUntil: "domcontentloaded"})
        let content = await page.content()

        let $ = cheerio.load(content)

        let js, css;

        js = getAllScripts($)
        css = getAllStyles($)

        browser = null

        res.json({ js, css });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


function getAllScripts($) {
    let js = []

    $('script').each((index, element) => {
        const src = $(element).attr('src');
        if (src) js.push(src);
    });

    $('link[rel="modulepreload"]').each((index, element) => {
        const href = $(element).attr('href');
        js.push(href);
    });

    return js
}

function getAllStyles($) {
    let css = []

    $('link[rel="stylesheet"], link[as="style"]').each((index, element) => {
        const href = $(element).attr('href');
        css.push(href);
    });

    return css
}

export default router;