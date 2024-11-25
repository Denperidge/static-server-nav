import { readFileSync, existsSync } from "fs";
import { globSync } from "glob";

export const config = {
    dir: {
        input: "src",
        output: "dist",
    }
}

function getConfig(eleventyConfig) {
    const rawLinks = JSON.parse(readFileSync(
        "config/links.json", { encoding: "utf8" })
    );
    console.log("Read links.json...")
    const images = globSync("config/*[!json]").map((image) => {
        let match = image.split(".")[0].toLowerCase();
        if (match.includes("/")) {
            match = match.split("/").pop()
        }
        return { 
            match: match,
            src: image
        }
    });

    const links = rawLinks.map(linkObj => {
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

    console.log("2222")
    console.log(links)
    return links;
}

export default function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("node_modules/@picocss/pico/css/pico.yellow.min.css")

    eleventyConfig.addGlobalData("links", getConfig(eleventyConfig));
}