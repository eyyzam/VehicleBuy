export class Auction {
  constructor(
    public auctionId: number,
    public carCategory: string,
    public carBrand: string,
    public carModel: string,
    public carProductionYear: number,
    public carMileage: number,
    public carEngineType: string,
    public carNumberOfSeats: number,
    public carColor: string,
    public sellerEmail: string,
    public auctionDescription: string
  ) {}
}
