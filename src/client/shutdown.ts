import {LOG} from "./logger";

let onShutdown: (() => void)[] = [];

export function AtShutdown(fn: () => void) {
    onShutdown.push(fn);
}

function shutdown() {
    onShutdown.forEach((fn) => fn());
    LOG.info("Shutdown complete");
    process.exit(0);
}

process.on("SIGINT", () => {
    LOG.info("Received SIGINT. Graceful shutdown...");
    shutdown();
});

process.on("SIGTERM", () => {
    LOG.info("Received SIGTERM. Graceful shutdown...");
    shutdown();
});

process.on("uncaughtException", (error) => {
    LOG.warn("Uncaught Exception:", error);
    shutdown();
});
