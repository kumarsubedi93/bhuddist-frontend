export type FormDataKeys =
  | "name1"
  | "name2"
  | "name3"
  | "name4"
  | "name5"
  | "singlePrice"
  | "packagePrice"
  | "space1"
  | "space2"
  | "space3";

// includedInArts means that input field or name comes under that form

export const InputFields: {
  label: string;
  chineseName?:string;
  name: FormDataKeys;
  includedInArts?: number[];
  isSpace?: boolean;
}[] = [
  {
    label: "Name",
    name: "name1",
    chineseName:'姓名1',
    includedInArts: [1, 2, 3, 4, 5],
  },
  {
    label: "Space1",
    name: "space1",
    includedInArts: [3],
    isSpace: true,
  },
  {
    label: "Name2",
    name: "name2",
    chineseName:'姓名2',
    includedInArts: [1, 2, 3],
  },
  {
    label: "Space2",
    name: "space2",
    includedInArts: [3],
    isSpace: true,
  },
  {
    label: "Name3",
    name: "name3",
    chineseName:'姓名3',
    includedInArts: [1],
  },
  {
    label: "Space3",
    name: "space3",
    includedInArts: [3],
  },
  {
    label: "Name4",
    name: "name4",
    chineseName:'姓名4',
    includedInArts: [1],
  },
  {
    label: "Name5",
    name: "name5",
    chineseName:'姓名5',
    includedInArts: [1],
  },
  // {
  //   label: "Price",
  //   name: "singlePrice",
  //   includedInArts: [1, 2, 3, 4, 5],
  // },
  // {
  //   label: "Package Price",
  //   name: "packagePrice",
  //   includedInArts: [1, 2, 3, 4, 5],
  // },
];

export const form1Validator : any = {
  name1: {
    maxLength: 5,
  },
  name2: {
    maxLength: 3,
  },
  name3: {
    maxLength: 3,
  },
  name4: {
    maxLength: 3,
  },
  name5: {
    maxLength: 20,
  },
  space3:{
    maxLength:1
  }
};
