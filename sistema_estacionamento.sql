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
tipo_vaga enum ('padrão', 'preferencial') default 'padrão',
tipo_pref varchar(255),
carro_id int,
foreign key (carro_id) references carros(id)
);

drop table carros;
drop table vagas; 

select * from carros;
select * from vagas;

SELECT identificador, tipo_vaga, tipo_pref, carro_id 
FROM vagas 
WHERE carro_id IS NOT NULL;

INSERT INTO vagas (identificador, ocupado, tipo_vaga, tipo_pref) VALUES
('A1', false, 'preferencial', 'cadeirante'),
('A2', false, 'padrão', null),
('A3', false, 'padrão', null),
('A4', false, 'padrão', null),
('A5', false, 'padrão', null),
('A6', false, 'padrão', null),
('A7', false, 'padrão', null),
('A8', false, 'preferencial', 'gestante'),

('B1', false, 'preferencial', 'cadeirante'),
('B2', false, 'padrão', null),
('B3', false, 'padrão', null),
('B4', false, 'padrão', null),
('B5', false, 'padrão', null),
('B6', false, 'padrão', null),
('B7', false, 'padrão', null),
('B8', false, 'preferencial', 'gestante'),

('C1', false, 'preferencial', 'cadeirante'),
('C2', false, 'padrão', null),
('C3', false, 'padrão', null),
('C4', false, 'padrão', null),
('C5', false, 'padrão', null),
('C6', false, 'padrão', null),
('C7', false, 'padrão', null),
('C8', false, 'preferencial', 'gestante'),

('D1', false, 'preferencial', 'cadeirante'),
('D2', false, 'padrão', null),
('D3', false, 'padrão', null),
('D4', false, 'padrão', null),
('D5', false, 'padrão', null),
('D6', false, 'padrão', null),
('D7', false, 'padrão', null),
('D8', false, 'preferencial', 'gestante'),

('E1', false, 'preferencial', 'cadeirante'),
('E2', false, 'preferencial', 'idoso'),
('E3', false, 'preferencial', 'idoso'),
('E4', false, 'preferencial', 'idoso'),
('E5', false, 'preferencial', 'idoso'),
('E6', false, 'preferencial', 'idoso'),
('E7', false, 'preferencial', 'idoso'),
('E8', false, 'preferencial', 'idoso');

update carros set perfil = 'admin' where id='2';


