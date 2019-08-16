const Vector2 = function(x,y) {
    this.x = x;
    this.y = y;

    this.set = function(x,y) {
        this.x = x;
        this.y = y;
    };

    this.copy = function() {
        return new Vector2(this.x,this.y);
    };

    this.add = function(vec) {
        return new Vector2(this.x + vec.x, this.y + vec.y);
    }

    this.mult = function(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    this.sub = function(vec) {
        return new Vector2(this.x - vec.x, this.y - vec.y);
    }

    this.dot = function(vec) {
        return this.x * vec.x + this.y * vec.y;
    }
    this.distanceTo = function(vec2) {
        var differenceVector = this.sub(vec2);
        return Math.sqrt(Math.pow(differenceVector.x, 2) + Math.pow(differenceVector.y, 2));
    }
    this.normalize = function() {
        var denominator = Math.sqrt(this.x * this.x + this.y * this.y);
        if(denominator === 0) denominator = 1;
        this.x /= denominator;
        this.y /= denominator;
    }
};