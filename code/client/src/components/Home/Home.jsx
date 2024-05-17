import React from "react";
import "./Home.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ImageCarousel from "./CarouselComponent";
import { Announcement } from "../Header/Header-Functions"
import BoxComponent from "./BoxComponent";
import AnnouncementNotice from "./NoticeBoardComponent";
import ScholarshipTableComponent from "./ScholarshipTableComponent";

function Home() {
    return (
        <div>
            <Header />
            <Announcement />
            {/* <ImageCarousel /> */}
            <BoxComponent />

            {/* Space for BoxComponent */}

            <section className="content-section" style={{backgroundColor: '#cae2ea', paddingTop: "20px"}}>
                <div className="container-fluid">
                    <div className="row">
                    
                        <div className="col-sm-4">
                        
                            <AnnouncementNotice />
                        </div>

                        <div className="col-sm-8">
                            <ScholarshipTableComponent />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Home;