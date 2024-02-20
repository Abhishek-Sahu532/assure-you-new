import shoe8 from '../../assets/images/shoe8.svg'
import './SuperQuality.css'


const SuperQuality = () => {
    return (
        <section
            id="about-us"
            className=""
        >

            <div className="textDisc">

                <h2> We Provide You

                    <span>Super </span>
                    <span>Quality </span> Shoes
                </h2>

                <p>
                    Discover stylish Nike arrivals, quality comfort, and innovation for
                    your active life.
                </p>

                <div className="buttonDiv">
                    <button>View details</button>
                </div>


            </div>
            {/* image part */}

            <div className="imageDiv"> <img src={shoe8} alt="shoe8"  /> </div>
        </section>
    );
};

export default SuperQuality;