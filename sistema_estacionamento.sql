create database sistema_estacionamento;
use sistema_estacionamento;

create table carros (
id int auto_increment primary key not null, 
placa varchar(7) not null unique,
motorista varchar(255) not null,
senha varchar(255) not null,
perfil enum('motorista', 'admin') default 'motorista'
);

create table vagas (
identificador varchar(2) not null primary key,
ocupado boolean default false,
vaga_pref boolean default null,
tipo_pref varchar(255),
carro_id int,
foreign key (carro_id) references carros(id)
);

drop table carros;
drop table vagas; 

select * from carros;
select * from vagas;

INSERT INTO vagas (identificador, ocupado, vaga_pref, tipo_pref) VALUES
('A1', false, true, 'cadeirante'),
('A2', false, false, null),
('A3', false, false, null),
('A4', false, false, null),
('A5', false, false, null),
('A6', false, false, null),
('A7', false, false, null),
('A8', false, true, 'gestante'),

('B1', false, true, 'cadeirante'),
('B2', false, false, null),
('B3', false, false, null),
('B4', false, false, null),
('B5', false, false, null),
('B6', false, false, null),
('B7', false, false, null),
('B8', false, true, 'gestante'),

('C1', false, true, 'cadeirante'),
('C2', false, false, null),
('C3', false, false, null),
('C4', false, false, null),
('C5', false, false, null),
('C6', false, false, null),
('C7', false, false, null),
('C8', false, true, 'gestante'),

('D1', false, true, 'cadeirante'),
('D2', false, false, null),
('D3', false, true, null),
('D4', false, true, null),
('D5', false, true, null),
('D6', false, false, null),
('D7', false, false, null),
('D8', false, true, 'gestante'),

('E1', false, true, 'cadeirante'),
('E2', false, true, 'idoso'),
('E3', false, true, 'idoso'),
('E4', false, true, 'idoso'),
('E5', false, true, 'idoso'),
('E6', false, true, 'idoso'),
('E7', false, true, 'idoso'),
('E8', false, true, 'idoso');

update carros set perfil = 'admin' where id='2';


