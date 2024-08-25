import React from 'react';
import './AboutUs.css';
import TimelineCard from './TimelineCard';

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <h1 className="title">O nama</h1>
            <p className="intro-text">
                Naša platforma je prošla dug put od svojih skromnih početaka do vodeće destinacije za ljubitelje muzike širom sveta. 
                U nastavku pogledajte ključne trenutke u našem razvoju.
            </p>
            <div className="timeline">
                <TimelineCard 
                    year="1990" 
                    text="Počeli smo kao mali tim entuzijasta okupljenih oko ideje da stvorimo digitalni prostor za ljubitelje muzike." 
                />
                <TimelineCard 
                    year="1995" 
                    text="Naša prva verzija platforme, koja je tada bila jednostavna baza podataka muzičkih bendova, lansirana je i stekla pažnju lokalnih muzičkih fanova." 
                />
                <TimelineCard 
                    year="2000" 
                    text="Proširili smo funkcionalnosti omogućivši korisnicima da ocenjuju bendove i dele svoja mišljenja kroz komentare. Naša zajednica je počela značajno da raste." 
                />
                <TimelineCard 
                    year="2005" 
                    text="Integracija sa popularnim muzičkim platformama omogućila je korisnicima da slušaju pesme direktno sa naše platforme, što je donelo novi nivo interakcije." 
                />
                <TimelineCard 
                    year="2010" 
                    text="Naša platforma postala je međunarodno prepoznata sa korisnicima iz preko 50 zemalja. Dodali smo podršku za više jezika i valuta." 
                />
                <TimelineCard 
                    year="2015" 
                    text="Uveli smo personalizovane preporuke bazirane na preferencijama korisnika, što je dodatno poboljšalo iskustvo korišćenja naše platforme." 
                />
                <TimelineCard 
                    year="2020" 
                    text="Naša mobilna aplikacija lansirana je, omogućivši korisnicima da uživaju u muzici i interakciji sa zajednicom gde god se nalazili." 
                />
                <TimelineCard 
                    year="2024" 
                    text="Proslavljamo 34 godine postojanja sa planovima za budućnost koji uključuju napredne AI tehnologije za muzičke preporuke i još veću povezanost korisnika." 
                />
            </div>
        </div>
    );
}

export default AboutUs;
