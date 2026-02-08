/* * THE CONTROL CENTER
 * Change these values to rebrand the entire site for a client.
 */

export const siteConfig = {
    // Identity
    brandName: "Chris & Emma Press", // Change to "Audin's Reno Log"
    metaDescription: "Life, renovations, recipes, and full-stack dev.",
    
    // API
    apiBaseUrl: import.meta.env.VITE_API_URL, 

    // Socials (Leave empty string to hide)
    socials: {
        spotify: "https://open.spotify.com/user/31fwx2afcabguf4gr57ahpcdk5he",
        facebook: "https://www.facebook.com/chris.tow.52/",
        patreon: "https://www.patreon.com/c/plantbasedrunner",
        github: "https://github.com/chris-tow",
        youtube: "https://youtube.com/@TheChrisAndEmmaShow",
        instagram: "https://instagram.com"
    },

    // Footer Network Links (The "Empire")
    networkLinks: [
        { label: "Wellness Hub", url: "https://wellness.chrisandemmashow.com" },
        { label: "The Pantry", url: "https://pantry.chrisandemmashow.com" },
        { label: "Podcast Site", url: "https://chrisandemmashow.com" },
        { label: "Mara Central", url: "https://maracentral.com" }
    ],

    // About Page Defaults (If they don't have a custom one yet)
    about: {
        heroTitle: "Life, Code, & Everything In Between",
        heroSubtitle: "Curating the best of lifestyle, technology, and adventures.",
        missionTitle: "Our Mission",
        missionText: "Born from a simple desire to take ownership of our digital footprint.",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
    }
};