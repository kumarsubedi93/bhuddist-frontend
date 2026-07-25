import { capitalizeFirstLetter, getChineName } from "@/lib/helper";

// Names of 2-3 chars render 30% larger, 4 chars render 20% larger; 5+ chars keep the current size.
// Tailwind's JIT compiler only picks up complete literal class strings found in this file, so
// each field's two scaled tiers are spelled out in full here rather than built via interpolation.
const FONT_SCALE_CLASSES = {
  name1: { tier1: "!text-[3rem]", tier2: "!text-[2.4rem]" }, // base 2rem
  name2: { tier1: "!text-[3rem]", tier2: "!text-[2.4rem]" }, // base 2rem
  name5: { tier1: "!text-[3rem]", tier2: "!text-[2.4rem]" }, // base 2rem
  name3: { tier1: "[&_span]:!text-[3rem]", tier2: "[&_span]:!text-[2.4rem]" }, // base 1.8rem
  name4: { tier1: "[&_span]:!text-[3rem]", tier2: "[&_span]:!text-[2.4rem]" }, // base 1.8rem
} as const;

const getScaledFontClass = (
  field: keyof typeof FONT_SCALE_CLASSES,
  len: number
) => {
  const classes = FONT_SCALE_CLASSES[field];
  if (len >= 1 && len <= 3) return classes.tier1;
  if (len === 4) return classes.tier2;
  return "";
};

export const Frame1 = ({
  name1,
  name2,
  name3,
  name4,
  name5,
  className,
}: any) => {
  const hasName4 = Boolean(name4?.trim?.());

  // Whitespace-stripped lengths, so spaces anywhere in the source data (leading/trailing, or
  // padding inserted between characters, e.g. "张   如    ") don't inflate the perceived character
  // count. Used for both the font-scale tier and the position-threshold branching (name1-5).
  const name1TrimmedLen = name1?.replace?.(/\s+/g, "")?.length ?? 0;
  const name2TrimmedLen = name2?.replace?.(/\s+/g, "")?.length ?? 0;
  const name3TrimmedLen = name3?.replace?.(/\s+/g, "")?.length ?? 0;
  const name4TrimmedLen = name4?.replace?.(/\s+/g, "")?.length ?? 0;
  const name5TrimmedLen = name5?.replace?.(/\s+/g, "")?.length ?? 0;

  const name1FontClass = getScaledFontClass("name1", name1TrimmedLen);
  const name2FontClass = getScaledFontClass("name2", name2TrimmedLen);
  const name3FontClass = getScaledFontClass("name3", name3TrimmedLen);
  const name4FontClass = getScaledFontClass("name4", name4TrimmedLen);
  const name5FontClass = getScaledFontClass("name5", name5TrimmedLen);

  return (
    <div
      className={`relative bg-contain bg-no-repeat child bg-[url('../assets/image1.jpeg')] ${
        className ?? "w-[370px] min-h-[1000px]"
      }`}
    >
      {" "}
      <div className="outertext">
        <div
          id="name3"
          className={`${
            name3TrimmedLen < 5
              ? `!left-[10px] ${name3FontClass}`
              : name3TrimmedLen < 10
              ? "!left-[-40px] [&_span]:!text-[1.5rem]"
              : "!left-[-60px] [&_span]:!text-[1.25rem]"
          } ${
            hasName4
              ? name3TrimmedLen < 5
                ? "!bottom-[180px]"
                : "!bottom-[220px]"
              : "!bottom-0"
          }`}
        >
          {name3?.split?.("")?.map?.((char: string) => (
            <span key={char}>{char}</span>
          ))}
        </div>
        {hasName4 && (
          <div
            id="name4"
            className={`${
              name4TrimmedLen < 5
                ? `!left-[10px] ${name4FontClass}`
                : name4TrimmedLen < 10
                ? "!left-[-40px] [&_span]:!text-[1.5rem]"
                : "!left-[-50px] [&_span]:!text-[1.25rem]"
            }`}
          >
            {name4?.split?.("")?.map?.((char: string) => (
              <span key={char}>{char}</span>
            ))}
          </div>
        )}
      </div>
      {name5 ? (
        <div className="innertext">
          <p
            id="name5"
            className={`${
              name5TrimmedLen > 7 ? "" : `!left-[28%] ${name5FontClass || "!text-[2rem]"}`
            }`}
          >
            {name5?.split?.("")?.map?.((char: string) => (
              <span key={char}>{char}</span>
            ))}
          </p>
        </div>
      ) : (
        <div className="container !static">
          {!name5 && (
            <p id="name1" className={name1FontClass}>
              {name1?.split?.("")?.map?.((char: string) => (
                <span key={char}>{char}</span>
              ))}
            </p>
          )}
          {!name5 && (
            <p id="name2" className={name2FontClass}>
              {name2?.split?.("")?.map?.((char: string) => (
                <span key={char}>{char}</span>
              ))}{" "}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export const Frame2 = ({
  name1,
  name2,
  space1,
  space2,
  space3,
  className,
}: any) => (
  <div
    className={`h-120 relative bg-contain bg-no-repeat child bg-[url('../assets/image2.png')] ${
      className ?? "w-[370px] min-h-[1000px]"
    }`}
    id="frame2"
  >
    <div
      id="name2"
      className={`${
        name2?.split?.("")?.length < 5
          ? "!left-[-10px]"
          : name2?.split?.("")?.length < 10
          ? "!left-[-40px]"
          : "!left-[-50px]"
      }`}
    >
      {name2?.split?.("")?.map?.((char: string) => (
        <span key={char}>{char}</span>
      ))}
    </div>
    <p id="name1">
      {name1?.split?.("")?.map?.((char: string) => (
        <span key={char}>{char}</span>
      ))}
    </p>
  </div>
);

export const Frame3 = ({
  name1,
  name2,
  space3,
  space1,
  space2,
  className,
}: any) => (
  <div
    className={`h-120 relative bg-contain bg-no-repeat child bg-[url('../assets/image3.png')] ${
      className ?? "w-[370px] min-h-[1000px]"
    }`}
    id="frame3"
  >
    <p id="name2">
      {name2?.split?.("")?.map?.((char: string) => (
        <span key={char}>{char}</span>
      ))}
    </p>
    <p id="space3">{space3}</p>
    <p id="space1">{space1}</p>
    <p id="space2">{space2}</p>
    <p id="name1">
      {name1?.split?.("")?.map?.((char: string) => (
        <span key={char}>{char}</span>
      ))}
    </p>
  </div>
);

export const Frame4 = ({ data, className }: any) => {
  return (
    <table
      className={`border-collapse border border-black ... w-full form4 ${className}`}
    >
      <thead>
        <tr>
          <th className="border border-black w-[40px]">序</th>
          <th className="border border-black min-w-[60px]">姓名</th>
          {/* <th className="border border-black min-w-[60px]">RM</th> */}
        </tr>
      </thead>
      <tbody>
        {data?.map(({ name1 }: any, index: any) => (
          <>
            <tr key={name1} className={(index + 1) % 10 === 0 ? "mb-40" : ""}>
              <td className="border border-black w-[40px]">{index + 1}</td>
              <td className="border border-black min-w-[60px]">{name1}</td>
              {/* <td className="border border-black min-w-[60px]"></td> */}
            </tr>
            {index != 9 && (index + 1) % 10 === 0 && (
              <tr className="show-pdf">
                <td colSpan={2} className="h-4"></td>{" "}
                {/* Spacer row with adjustable height */}
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
};

export const Frame5 = ({ name1 }: any) => (
  <div
    className={`h-120  w-[21rem]  relative bg-contain bg-no-repeat  min-h-[1800px] child bg-[url('../assets/image5.png')] bg-center`}
    id="frame5"
  >
    <p
      id="name1"
      className={`${name1?.split?.("").length <= 3 ? "!text-[4rem]" : ""}`}
    >
      {name1?.split?.("")?.map?.((char: string) => (
        <span key={char}>{char}</span>
      ))}
    </p>
  </div>
);

export const ArtTable = ({ headersData, data, artId, className }: any) => {
  return (
    <table
      className={`border-collapse border border-black ... !w-full form4 ${className}`}
    >
      <thead>
        <tr>
          {headersData?.map((key: string) => (
            <th
              className={`border border-black ${
                key === "id" ? "w-5" : "min-w-[80px]"
              }`}
              key={key}
            >
              {["singlePrice"].includes(key) ? "RM" : getChineName(key, artId)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((row: any, index: any) => (
          <tr key={row.id}>
            {headersData?.map((key: any) => (
              <td
                className={`border border-black text-center ${
                  key === "id" ? "w-5 !text-center" : "min-w-[80px]"
                } text-start px-4 py-4`}
                key={key}
              >
                {key === "id"
                  ? index + 1
                  : ["singlePrice", "packagePrice"].includes(key)
                  ? ""
                  : artId == 3 && key === "space2"
                  ? `${row.space2 ?? ""} 氏腹中 ${row.space3 ?? ""}位童灵`
                  : artId == 3 && key === "space1"
                  ? `落孕夭枉水子 ${row.space1 ?? ""}位婴灵`
                  : row[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
