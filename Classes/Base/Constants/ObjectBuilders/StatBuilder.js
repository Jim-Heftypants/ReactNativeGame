export default StatObject = (stats) => {
    // stats = [Str, Dex, Con, Int, Wis, Cha];
    // base total = 20;
    return (
        {
            Str: stats[0],
            Dex: stats[1],
            Con: stats[2],
            Int: stats[3],
            Wis: stats[4],
            Cha: stats[5],
        }
    )
};