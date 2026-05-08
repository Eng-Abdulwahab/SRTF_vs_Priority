export function calculateAverages(result) {
    if (!result || result.length === 0) {
        return { avgWt: 0, avgTat: 0, avgRt: 0 };
    }

    const avgWt =
        result.reduce((s, p) => s + (p.wt || 0), 0) / result.length;

    const avgTat =
        result.reduce((s, p) => s + (p.tat || 0), 0) / result.length;

    const avgRt =
        result.reduce((s, p) => s + (p.rt || 0), 0) / result.length;

    return { avgWt, avgTat, avgRt };
}