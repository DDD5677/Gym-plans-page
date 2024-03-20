export type Plan={
	id:string,
	name:string,
	price:number,
	lengthInDays:number,
	isPopular:boolean,
	isEndless:boolean,
	isDiscount:boolean,
	nonDiscountId:string,
	ownerId:string,
	statusId?:string|null,
	creationDateTime:string,
	deleted:boolean
}