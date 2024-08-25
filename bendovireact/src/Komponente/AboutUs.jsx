import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <h1 className="title">O nama</h1>
            <p className="intro-text">
                Naša platforma je prošla dug put od svojih skromnih početaka do vodeće destinacije za ljubitelje muzike širom sveta. 
                U nastavku pogledajte ključne trenutke u našem razvoju.
            </p>
            <div className="timeline">
                <div className="timeline-item">
                    <div className="timeline-content">
                        <h2>1990</h2>
                        <p>Počeli smo kao mali tim entuzijasta okupljenih oko ideje da stvorimo digitalni prostor za ljubitelje muzike.</p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-content">
                        <h2>1995</h2>
                        <p>Naša prva verzija platforme, koja je tada bila jednostavna baza podataka muzičkih bendova, lansirana je i stekla pažnju lokalnih muzičkih fanova.</p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-content">
                        <h2>2000</h2>
                        <p>Proširili smo funkcionalnosti omogućivši korisnicima da ocenjuju bendove i dele svoja mišljenja kroz komentare. Naša zajednica je počela značajno da raste.</p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-content">
                        <h2>2005</h2>
                        <p>Integracija sa popularnim muzičkim platformama omogućila je korisnicima da slušaju pesme direktno sa naše platforme, što je donelo novi nivo interakcije.</p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-content">
                        <h2>2010</h2>
                        <p>Naša platforma postala je međunarodno prepoznata sa korisnicima iz preko 50 zemalja. Dodali smo podršku za više jezika i valuta.</p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-content">
                        <h2>2015</h2>
                        <p>Uveli smo personalizovane preporuke bazirane na preferencijama korisnika, što je dodatno poboljšalo iskustvo korišćenja naše platforme.</p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-content">
                        <h2>2020</h2>
                        <p>Naša mobilna aplikacija lansirana je, omogućivši korisnicima da uživaju u muzici i interakciji sa zajednicom gde god se nalazili.</p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-content">
                        <h2>2024</h2>
                        <p>Proslavljamo 34 godine postojanja sa planovima za budućnost koji uključuju napredne AI tehnologije za muzičke preporuke i još veću povezanost korisnika.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
