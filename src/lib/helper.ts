import { InputFields } from "@/components/createFrames/helper";

/**
 * Helper function to make API calls using fetch
 * @param {string} url - The URL to fetch.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param {Object} headers - The headers to include in the request.
 * @param {Object} body - The body of the request (for methods like POST and PUT).
 * @returns {Promise} - A promise that resolves to the response data.
 */
export const BASE_URL =  process.env.NEXT_PUBLIC_BASE_URL ||"https://bhuddist-backend-xz1j.vercel.app"

export async function apiCall(
  url: string,
  method: string = "GET",
  body: any = null,
  headers: Record<string, string> = {},
): Promise<any> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    cache:'no-cache'
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`,options );
    const data = await response.json();
    return {data};
  } catch (error : any) {
    console.error("Fetch error:", error);
    return {error : error.message}
  }
}

export const getAllFormValues = (frame : any) =>{
  return {
    name1: frame?.name1 || "",
    name2: frame?.name2 || "",
    name3: frame?.name3 || "",
    name4: frame?.name4 || "",
    name5: frame?.name5 || "",
    space1:frame?.space1 || "",
    space2:frame?.space2 || "",
    space3:frame?.space3 || "",
    singlePrice: frame?.singlePrice || "",
    packagePrice: frame?.packagePrice || "",
  }
}

export function capitalizeFirstLetter(string :string) {
  if (!string) return ''; // Handle empty string or undefined/null input
  const chineseName = InputFields.find(({name})=>name.toLowerCase() === string.toLowerCase())
  const value = chineseName?.chineseName ??  string.charAt(0).toUpperCase() + string.slice(1);
  return value
}

const chineseNames : any= {
  "1":{
    id:'编号',
    name1 :'亡者1',
    name2:'亡者2',
    name3:'  拜荐者1',
    name4:'拜荐者2'
  },
  '2':{
    id:'编号',
    name1 :'敬薦人1',
    name2:'敬薦人2'
  },
  '3':{
    id:'编号',
    name1:'拜荐者1',
    name2:'拜荐者2',
    space1:'1',
    space2:'2'
  },
  '4':{
    id:'序',
    name1:'姓名'
  },
  '5':{
    id:'序',
    name1:'姓名'
  }
}

export function getChineName(string :string , artId : number) {
  if (!string) return ''; // Handle empty string or undefined/null input
  const chineseName = chineseNames[artId]?.[string.toLowerCase()] ?? string
  const value = chineseName ??  string.charAt(0).toUpperCase() + string.slice(1);
  return value
}

export function capitalizeArrayFirstLetters(array : Array<string>, id : any) {
  return array.map((val)=>getChineName(val , id));
}

export const frameNames : any = {
  '1':'超度祖先',
  '2':'超度历劫冕親菩萨',
  '3':'超度婴灵',
  '4':'年超度法会参加小蒙山信众芳名、宝号',
  '5':'年超度法会供佛供斋信众芳名、宝号'
}

export const getYears = (startYear = 2020) => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  return years;
};