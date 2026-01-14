export interface ICatalogResolver {
  findAll(...args: any[]): Promise<any[]>

  findById(...args: any[]): Promise<any>

  create(...args: any[]): Promise<any>

  update(...args: any[]): Promise<any>

  delete(...args: any[]): Promise<any>
}