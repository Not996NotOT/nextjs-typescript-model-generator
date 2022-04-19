export class abc  { 
	/**
	* @description winningAmount
	* @type {string}
	*/
	winningAmount;
	/**
	* @description skcCode
	* @type {string}
	*/
	skcCode;
	/**
	* @description cover
	* @type {string}
	*/
	cover;
	/**
	* @description productName
	* @type {string}
	*/
	productName;
	/**
	* @description level
	* @type {string}
	*/
	level;
	/**
	* @description levelStarUrl
	* @type {string}
	*/
	levelStarUrl;
	/**
	* @description remain
	* @type {string}
	*/
	remain;
	/**
	* @description brandOfficial
	* @type {string}
	*/
	brandOfficial;
	/**
	* @description hitRatio
	* @type {string}
	*/
	hitRatio;
	constructor({ 
		winningAmount=0,
		skcCode="",
		cover="",
		productName="",
		level="",
		levelStarUrl="",
		remain=0,
		brandOfficial="",
		hitRatio=0,
	}={}) { 
		this.winningAmount = winningAmount;
		this.skcCode = skcCode;
		this.cover = cover;
		this.productName = productName;
		this.level = level;
		this.levelStarUrl = levelStarUrl;
		this.remain = remain;
		this.brandOfficial = brandOfficial;
		this.hitRatio = hitRatio;
	}
}