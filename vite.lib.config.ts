import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"

// Library build configuration for publishing as npm package
export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ["src/audio-player"],
<<<<<<< HEAD
            exclude: ["src/**/__tests__/**"],
=======
>>>>>>> main
            outDir: "dist",
            strictOutput: true,
            rollupTypes: true,
        }),
    ],
    build: {
        lib: {
            entry: "src/audio-player/index.ts",
<<<<<<< HEAD
            formats: ["es", "cjs"],
=======
            name: "SEIHouseAudioPlayer",
>>>>>>> main
            fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
            cssFileName: "styles",
        },
        outDir: "dist",
        rollupOptions: {
            external: ["react", "react-dom", "essentia.js", "wavesurfer.js"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
<<<<<<< HEAD
                exports: "named",
=======
>>>>>>> main
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.endsWith(".css")) {
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
