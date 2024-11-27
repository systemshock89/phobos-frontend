const yaC = () => {
    const checkYaIdAvailability = () => {
        if (typeof window.Ya !== 'undefined') {
            getYaId();
        }
    };

    const getYaId = () => {
        let metrika = window.Ya.Metrika2 || window.Ya.Metrika;
        if (metrika) {
            window.yaC = metrika.counters()[0]?.id;
        }
    };

    // Check for Ya.Metrika every 500ms up to 5 seconds
    const interval = setInterval(() => {
        if (typeof window.Ya !== 'undefined') {
            checkYaIdAvailability();
            clearInterval(interval); // Stop checking once Ya.Metrika is available
        }
    }, 500);

    // Clear interval after 5 seconds if Ya.Metrika is not available
    setTimeout(() => clearInterval(interval), 5000);
};

export default yaC;
