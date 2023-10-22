import methods, { MethodName } from "./apiCalls.ts";

export const makeRequest = async (requestName: MethodName, data: any = null): Promise<any> => {
  try {
    const request = await methods[requestName]?.(data);
    return Promise.resolve(request);
  } catch (e) {
    return Promise.reject(e);
  }
};
