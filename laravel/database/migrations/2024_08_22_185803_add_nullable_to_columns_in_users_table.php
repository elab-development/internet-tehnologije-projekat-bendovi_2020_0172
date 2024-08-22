<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone_number')->nullable()->change();
            $table->text('bio')->nullable()->change();
            $table->date('birthdate')->nullable()->change();
            $table->string('profile_photo')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone_number')->nullable(false)->change();
            $table->text('bio')->nullable(false)->change();
            $table->date('birthdate')->nullable(false)->change();
            $table->string('profile_photo')->nullable(false)->change();
        });
    }
};
