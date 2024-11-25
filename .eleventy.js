import { readFileSync, existsSync } from "fs";
import {join} from "path"
import { cwd } from "process";
import { globSync } from "glob";
import admZip from "adm-zip"; "adm-zip";
export const config = {
    dir: {
        input: "src",
        output: "dist",
    }
}

function getConfig(eleventyConfig) {
    const config = JSON.parse(readFileSync(
        "config/config.json", { encoding: "utf8" })
    );

    const images = globSync("config/*[!json]").map((image) => {
        let match = image.split(".")[0].toLowerCase();
        if (match.includes("/")) {
            match = match.split("/").pop();
        }

        if (match == "background" || match == "bg") {
            eleventyConfig.addPassthroughCopy(image)
            config.background = image;
        }

        return { 
            match: match,
            src: image
        }
    });


    config.links = config.links.map(linkObj => {
        let [title, url] = linkObj;
        const titleMatch = title.match(/.*?(?= |$)/)[0].toLowerCase()

        const image = images.find((image) => image.match == titleMatch);
        if (image === undefined) {
            return {title, url}
        } else {
            console.log("defiend")
            eleventyConfig.addPassthroughCopy(image.src)
            return {
                title: title, 
                url: url,
                src: image.src,
                alt: `Logo for ${title}`
            }
        }

    })

    return config;
}

export default function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("node_modules/@picocss/pico/css/pico.yellow.min.css")
    eleventyConfig.addGlobalData("config", getConfig(eleventyConfig));

    eleventyConfig.on("eleventy.after", async ({dir, results, runMode, outputMode}) => {
        const outputDir = join(cwd(), dir.output);
        console.log(`- Built static-server-nav at ${outputDir}`)

        const zip = new admZip();
        zip.addLocalFolder(dir.output)
        zip.writeZip("dist.zip");
        console.log(`- Zipped static-server-nav build to ${join(cwd(), "dist.zip")}`)
    });
}