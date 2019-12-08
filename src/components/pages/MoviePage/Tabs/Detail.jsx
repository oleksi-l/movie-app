import React from "react";

const Detail = React.memo(props => {
	const { budget, genres, popularity, original_language, original_title,
		production_companies, production_countries, release_date, runtime, status, revenue } = props.details;
	return (
		<div>
			<ul className="details-list mt-3">
				<li>Статус {status}</li>
				<li>Дата выхода {release_date}</li>
				<li>Продолжительность {runtime ? runtime : "неизвестно"} мин.</li>

				<li>Жанры
    	        {genres && genres.map(genre => {
					return <span
						key={genre.id}
						className="genre-badge badge badge-info">{genre.name}</span>;
				})}
				</li>
				<li>Страна-производитель
   		        {production_countries && production_countries.map(country => {
					return <span
						key={country.iso_3166_1}
						className="genre-badge badge badge-info">{country.name}</span>;
				})}
				</li>
				<li>Компании-производители
   		        {production_companies && production_companies.map(company => {
					return <span
						key={company.id}
						className="genre-badge badge badge-info">{company.name}</span>;
				})}
				</li>
				<li>Популярность {popularity} </li>
				<li>Язык оригинала {original_language}</li>
				<li>Оригинальное название {original_title}</li>
				<li>Бюджет  {budget ? `${budget}$` : "неизвестно"}</li>
				<li>Кассовые сборы {revenue ? `${revenue}$` : "неизвестно"}</li>
			</ul>
		</div>
	)
});

export default Detail;