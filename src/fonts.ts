import { Oswald, Work_Sans } from "next/font/google";

const normal = Work_Sans({ subsets: ["latin"] });
const title = Oswald({ subsets: ["latin"], weight: "700" });

const fonts = { normal, title };

export default fonts;
