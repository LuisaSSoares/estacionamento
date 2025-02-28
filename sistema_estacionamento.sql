create database sistema_estacionamento;
use sistema_estacionamento;

create table carros (
placa varchar(7) not null primary key,
motorista varchar(255),
senha varchar(255),
perfil enum('motorista', 'admin') default 'motorista',
vaga_identificador varchar(2)
);

create table vagas (
identificador varchar(2) not null primary key,
ocupado boolean default false,
vaga_pref boolean default false,
tipo_pref varchar(255),
carro_placa varchar(7),
foreign key (carro_placa) references carros(placa)
);

drop table carros;
drop table vagas



