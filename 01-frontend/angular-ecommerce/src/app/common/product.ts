export class Product {
	private _id: string;
	public get id(): string {
		return this._id;
	}
	public set id(value: string) {
		this._id = value;
	}
	private _sku: string;
	public get sku(): string {
		return this._sku;
	}
	public set sku(value: string) {
		this._sku = value;
	}
	private _name: string;
	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		this._name = value;
	}
	private _description: string;
	public get description(): string {
		return this._description;
	}
	public set description(value: string) {
		this._description = value;
	}
	private _unitPrice: number;
	public get unitPrice(): number {
		return this._unitPrice;
	}
	public set unitPrice(value: number) {
		this._unitPrice = value;
	}
	private _imageUrl: string;
	public get imageUrl(): string {
		return this._imageUrl;
	}
	public set imageUrl(value: string) {
		this._imageUrl = value;
	}
	private _active: boolean;
	public get active(): boolean {
		return this._active;
	}
	public set active(value: boolean) {
		this._active = value;
	}
	private _unitInStock: number;
	public get unitInStock(): number {
		return this._unitInStock;
	}
	public set unitInStock(value: number) {
		this._unitInStock = value;
	}
	private _dateCreated: Date;
	public get dateCreated(): Date {
		return this._dateCreated;
	}
	public set dateCreated(value: Date) {
		this._dateCreated = value;
	}
	private _lastUpdate: Date;
	public get lastUpdate(): Date {
		return this._lastUpdate;
	}
	public set lastUpdate(value: Date) {
		this._lastUpdate = value;
	}
}
