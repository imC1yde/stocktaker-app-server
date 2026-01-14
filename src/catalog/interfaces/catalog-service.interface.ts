export interface ICatalogService {
  findAll(userId: string, ...args: any[]): Promise<any[]>

  findById(id: string, ...args: any[]): Promise<any>

  create(input: any, ...args: any[]): Promise<any>

  update(id: string, input: any, ...args: any[]): Promise<any>

  delete(id: string, ...args: any[]): Promise<any>
}