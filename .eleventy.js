import { readFileSync, existsSync } from "fs";
import { globSync } from "glob";

export const config = {
    dir: {
        input: "src",
        output: "dist",
    }
}

export default function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("node_modules/@picocss/pico/css/pico.yellow.min.css")

    eleventyConfig.addGlobalData("links", () => {
        const links = JSON.parse(readFileSync(
            "config/links.json", { encoding: "utf8" })
        );
        console.log("Read links.json...")
        const images = globSync("config/*[!json]").map((image) => {
            return { 
                match: image.split(".")[0].toLowerCase(),
                src: image
            }
        });

        links.map(linkObj => {
            let [title, url] = linkObj;
            title = title.match(/.*?(?= |$)/)[0].toLowerCase()

            const image = images.find((image) => image.match == title);
            if (image === undefined) {
                return [title, url]
            } else {
                return [title, url, image.src]
            }

        })
        return links;
    });
}