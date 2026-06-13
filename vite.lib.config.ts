import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
import dts from "vite-plugin-dts"

// Library build configuration for publishing as npm package
export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ["src/audio-player"],
            outDir: "dist",
            strictOutput: true,
            rollupTypes: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src/audio-player/index.ts"),
            name: "SEIHouseAudioPlayer",
            fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
        },
        outDir: "dist",
        rollupOptions: {
            external: ["react", "react-dom", "essentia.js", "wavesurfer.js"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
                // Preserve CSS as separate file
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === "style.css") {
                        return "styles.css"
                    }
                    return assetInfo.name ?? "[name][extname]"
                },
            },
        },
        sourcemap: true,
        minify: false,
        cssCodeSplit: true,
    },
})
