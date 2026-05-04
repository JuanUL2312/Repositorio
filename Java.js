function getJavaVersion() {
    if (typeof java === "undefined" || !java.lang || !java.lang.System) {
        throw new Error("Java runtime object not available.");
    }
    return java.lang.System.getProperty("java.version");
}
var javaVersion = getJavaVersion();
console.log("Java Version: " + javaVersion);
