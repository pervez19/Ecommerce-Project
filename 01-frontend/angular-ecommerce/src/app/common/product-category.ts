export class ProductCategory {

    private _id: string;
	public get id(): string {
		return this._id;
	}
	public set id(value: string) {
		this._id = value;
    }
    
    private _categoryName: string;
	public get categoryName(): string {
		return this._categoryName;
	}
	public set categoryName(value: string) {
		this._categoryName = value;
	}

}
